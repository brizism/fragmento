import React, { useEffect, useMemo } from "react";
import {
  useAuthenticate,
  useChallenge,
  useDefaultProfile,
  usePost,
} from "@memester-xyz/lens-use";
import { useAccount, useSignMessage } from "wagmi";
import { DefaultProfile } from "@memester-xyz/lens-use/dist/types/lens";

const useInterval = (callback, delay) => {
  const savedCallback = useMemo(() => callback, [callback]);

  useEffect(() => {
    const tick = () => savedCallback();
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay, savedCallback]);
};

const useIsTokenValid = () => {
  const [isValid, setIsValid] = React.useState(false);

  const checkIfExpired = async () => {
    const _localToken = JSON.parse(localStorage.getItem("lens"));
    if (!_localToken) return false;
    const { expires, access } = _localToken;
    // check if 30 mins passed
    const isExpired = new Date().getTime() - expires > 30 * 60 * 1000;
    setIsValid(!isExpired);
  };

  return {
    isValid,
    checkIfExpired,
  };
};

// lens context
export const LensContext = React.createContext<{
  isTokenValid: boolean;
  login: () => void;
  profile: DefaultProfile;
  // state
  setFileCID: React.Dispatch<React.SetStateAction<string>>;
}>({
  isTokenValid: false,
  login: () => {},
  setFileCID: () => {},
  profile: {} as DefaultProfile,
});
LensContext.displayName = "LensContext";

export const LensProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [fileCID, setFileCID] = React.useState<string>();
  const [signedData, setSignedData] = React.useState(null);

  // wagmi hooks
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage({
    onSuccess: (data) => {
      setSignedData(data);
    },
  });

  // lens hooks
  const { data: challengeData } = useChallenge(address);
  const { defaultProfile } = useDefaultProfile(address) || {};
  const { post, error, loading, publicationId } = usePost(
    defaultProfile?.id,
    fileCID,
    {
      onBroadcasted: (receipt) => {
        console.log("onBroadcasted", receipt);
      },
      onCompleted(receipt) {
        console.log("onCompleted", receipt);
      },
    }
  );
  const [authenticate, { data: authenticateData }] = useAuthenticate(
    address,
    signedData
  );

  // hooks
  const { isValid, checkIfExpired } = useIsTokenValid();

  useEffect(() => {
    if (fileCID) {
      console.log( post())
      // clear localstorage
      // localStorage.removeItem("lens");
    }
  }, [fileCID, post]);

  console.log("first ✨", {
    error,
    loading,
    publicationId,
    defaultProfile
  });

  useEffect(() => {
    checkIfExpired();
  }, [checkIfExpired]);

  useEffect(() => {
    if (signedData) {
      authenticate();
    }
  }, [authenticate, signedData]);

  useEffect(() => {
    if (authenticateData?.authenticate?.accessToken) {
      // save authenticateData to local storage for 30 mins
      localStorage.setItem(
        "lens",
        JSON.stringify({
          access: authenticateData,
          expires: Date.now() + 30 * 60 * 1000,
        })
      );
      checkIfExpired();
    }
  }, [authenticateData, checkIfExpired]);

  useInterval(checkIfExpired, 10000);

  // context state
  const value = useMemo(
    () => ({
      isTokenValid: isValid,
      login: async () => {
        if (challengeData?.challenge?.text) {
          await signMessageAsync({
            message: challengeData?.challenge.text,
          });
        }
      },
      setFileCID,
      profile: defaultProfile,
    }),
    [isValid, defaultProfile, signMessageAsync, challengeData?.challenge.text]
  );

  return <LensContext.Provider value={value}>{children}</LensContext.Provider>;
};

export const useLens = () => React.useContext(LensContext);

"use client";

import { getProviders, signIn } from "next-auth/react";
import { type } from "os";
import { useEffect, useState } from "react";
import Button from "./Button";

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | null;
};

type Providers = Record<string, Provider>;

const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();

      setProviders(res);
    };
    fetchProviders();
  }, []);

  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider: Provider, i) => (
          <Button
            type="button"
            key={i}
            handleClick={() => signIn(provider?.id)}
            title="Sgin In"
          />
        ))}
      </div>
    );
  }
};

export default AuthProviders;

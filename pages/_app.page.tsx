import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Amplify from '@aws-amplify/core';
import { Authenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import awsExports from "../src/aws-exports";
import "../styles/globals.css";
import "@aws-amplify/ui-react/styles.css";

import { useEffect } from 'react';

import Layout from '../components/Layout'

const ADMIN_GROUP_NAME = 'Admins';

Amplify.configure({ ...awsExports, ssr: true });

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Authenticator.Provider>
      <Authenticator>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Authenticator>
    </Authenticator.Provider>
  )
}

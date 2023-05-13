// components/Layouts.tsx
import { ReactElement, useRef, useState } from 'react';

import { Amplify, Auth } from "aws-amplify";
import styles from '../styles/main.module.scss'


const ADMIN_GROUP_NAME = 'Admins';

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

export default function Layout({ children }: LayoutProps) {

const [ showAdmin, setShowAdmin ] = useState<boolean>(false)

  const init = async() => {
    const currentUser = await Auth.currentAuthenticatedUser();
    const groups = currentUser?.signInUserSession?.accessToken?.payload[
      'cognito:groups'
    ] as Array<string>
    const isAdmin = groups?.includes(ADMIN_GROUP_NAME) ?? false
    if (isAdmin===true) {
        setShowAdmin(true);
    } else {
      Auth.signOut();
    }
  }
  init();

    return (
        <>
            {showAdmin===true ?
            <div className="main">
                <div className={styles.header}>
header
                </div>
                <div className="content">
                    {children}
                </div>
                </div>
            : ''}
        </>
    )
}
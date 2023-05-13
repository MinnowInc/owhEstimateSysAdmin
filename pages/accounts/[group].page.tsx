import React, { useEffect, useRef, useState, createContext, useCallback } from "react"
import { useRouter } from 'next/router';
import { Auth, API } from 'aws-amplify'
import styles from '@/styles/main.module.scss';
import { IlistUsersInGroupUser, IlistUsersInGroup } from '@/interfaces/cognito'

//export const UpdateUserContext = createContext<any>(null)
const LIST_LOOP_LIMIT = 60

interface StringKeyObject {
    [key: string]: string
}
type IUserList = [
    {value: number},
    {value: string | boolean | number, actionType: string},
    {value: string | boolean | number, actionType: string},
    {value: string | boolean | number, actionType: string},
    {value: string | boolean | number, actionType: string}
]

const GROUP_TYPE: StringKeyObject = {
    admins: 'Admins',
    users: 'Users',
}
export default function Users() {

    const router = useRouter();

    const [ users, setUsers ] = useState<IUserList[]>([]);

    const getUserList = useCallback( async(group: string) => {
        const api = 'AdminQueries';
            const path = '/listUsersInGroup';
            const myInit = {
                queryStringParameters: {
                groupname: group,
                limit: LIST_LOOP_LIMIT,
                token: null,
                },
                headers: {
                'Content-Type': 'application/json',
                Authorization: `${(await Auth.currentSession())
                    .getAccessToken()
                    .getJwtToken()}`,
                },
            }
            const results: IlistUsersInGroup = await API.get(api, path, myInit)
            const nextToken: String = results.NextToken

            const userList: IUserList[] = results.Users?.map((r:IlistUsersInGroupUser, idx:number) => {
                return [
                    {value: (idx + 1)},
                    {value: r.Attributes[4].Value, actionType: ''},
                    {value: r.Attributes[2].Value, actionType: ''},
                    {value: r.Attributes[3].Value, actionType: ''},
                    {value: r.Attributes[0].Value, actionType: 'onClick'}
                ]
            })
            return userList
    }, [])

    const [ group, setGroup ] = useState<string>('');
    useEffect(() => {
        const { group } = router.query;
        if (group==='admins' || group==='users') {
            setGroup(GROUP_TYPE[group])
        }
    },[router]);

    useEffect(() => {
        async function fetchListAsync(group: string) {
            const userList = await getUserList(group)
            setUsers(userList)
        }
        if (group) {
            fetchListAsync(group);
        }
    },[group, setUsers, getUserList])


    const thead = useRef([
        'No.','会社名','氏名','メールアドレス',''
    ])

  return (
    <>
        <div className={styles.userList}>
        <table className={styles.table}>
              <thead>
                  <tr className={styles.tr}>
                  {thead.current?.map((item: string, idx: number) => (
                        <th key={`head-` + idx} className={styles.th}>{item}</th>
                    ))}
                  </tr>
              </thead>
              <tbody>
                {users?.map((body:any, idx: number) => (
                <tr key={`body-` + idx} className={styles.tr}>
                    {body?.map((item: any, i: number) => {
                        if (item.actionType==='onClick') {
                            return (<td key={`item-` + i}  className={styles.td}><button>詳細</button></td>)
                        } else if (item.actionType==='onClickMenu') {
                            return (<td key={`item-` + i}  className={styles.td}></td>)
                        } else if (item.actionType==='onClickProduct') {
                            return (<td key={`item-` + i}  className={styles.td}></td>)
                        } else {
                            return (<td key={`item-` + i} className={styles.td}>{item.value}</td>)
                        }
                    })}
                </tr>
                ))}
              </tbody>
          </table>
          </div>
    </>
  )
}

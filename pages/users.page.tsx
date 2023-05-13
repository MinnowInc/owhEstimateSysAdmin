import React, { useEffect, useRef, useState, createContext, useCallback } from "react"
import { Auth, API } from 'aws-amplify'
import styles from '@/styles/main.module.scss';

export const UpdateUserContext = createContext<any>(null)
const LIST_LOOP_LIMIT = 60
export default function Users() {

    const [ users, setUsers ] = useState<String[]>([])

    const type = 'Admins';
    const getUserList = useCallback( async() => {
        let api = 'AdminQueries';
            let path = '/listUsersInGroup';
            const myInit = {
                queryStringParameters: {
                groupname: type,
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
            const results: any = await API.get(api, path, myInit)
            let userList:any = []
            console.log(results.Users)
            const nextToken: String = results.NextToken
            results.Users?.forEach((r:any, idx:number) => {
                userList.push([
                    {value: (idx + 1)},
                    {value: r.Attributes[4].Value, actionType: ''},
                    {value: r.Attributes[2].Value, actionType: ''},
                    {value: r.Attributes[3].Value, actionType: ''},
                    {value: r.Attributes[0].Value, actionType: 'onClick'}
                ])
            })
            return userList
    }, [])

    useEffect(() => {
        async function fetchListAsync() {
            const userList = await getUserList()
            setUsers([...userList])
        }
        fetchListAsync()
    },[setUsers, getUserList]);

  return (
    <>
      
    </>
  )
}

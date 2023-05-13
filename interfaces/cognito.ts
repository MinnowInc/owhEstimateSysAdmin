
export interface IlistUsersInGroupUser {
    Attributes: {
        Name: string
        Value: string | boolean | number
    }[]
    Enabled: boolean
    UserCreateDate: Date
    UserLastModifiedDate: Date
    UserStatus: string
    Username: string
}

export interface IlistUsersInGroup  {
    NextToken: string
    Users: IlistUsersInGroupUser[]
}
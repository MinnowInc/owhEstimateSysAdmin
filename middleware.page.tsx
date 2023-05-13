import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { Amplify, Auth } from "aws-amplify";
import { useEffect } from 'react';
const ADMIN_GROUP_NAME = 'Admins';
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    

}

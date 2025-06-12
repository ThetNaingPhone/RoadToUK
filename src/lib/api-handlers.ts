// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'
// type Handler = (req: Request, userId?: String) => Promise <Response>
// type Handlers = Partial<Record<Method, Handler>>

// function methodNotAllowed(method: String) {
//     return NextResponse.json({ error: `Method ${method} Not Allowed` }, { status: 405 })
// }

// function internalError(error: unknown) {
//     console.error('[API Error]', error)
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
// }

// export function apiHandlerWithAuth(handlers: Handlers) {
//     return async function handler(req: Request) {
//         const cookieStore = await cookies();
//         const cookie = cookieStore.get('userId');
//         const userId = cookie ? cookie.value : undefined;
//         if(!userId) {
//             return NextResponse.json({ error: 'Unauthorized'}, { status: 401})
//         }

//         const method = req.method as Method
//         const methodHander = handlers[method]
//         if(!methodHander) return methodNotAllowed(method)

//         try {
//             return await methodHander(req, userId)
//         } catch (error) {
//             return internalError(error)
//         }
//     }
// }


// export function apiHandlerWithNoAuth(handlers: Handlers) {
//     return async function handler(req: Request) {
//         const getCookies = await cookies();
//         const userId = getCookies.get('userId')?.value   
//         if(userId) {
//             return NextResponse.json({error: 'Already Authenticated'}, {status: 403})
//         }

//         const method = req.method as Method
//         const methodHander = handlers[method];
//         if(!methodHander) return methodNotAllowed(method);
        
//         try {
//             return await methodHander(req)
//         } catch (error) {
//             return internalError(error);
//         }
//     }
// }


import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from './auth'

type HandlerFn = (req: NextRequest, user?: any) => Promise<NextResponse>

export function apiHandlerWithAuth(handlers: Record<string,HandlerFn>) {
  return async (req: NextRequest) => {
    const fn = handlers[req.method!]
    if (!fn) return new NextResponse('Method not allowed', { status:405 })
    const user = await getCurrentUser()
    if (!user) return new NextResponse('Unauthorized', { status:401 })
    return fn(req, user)
  }
}

export function apiHandlerNoAuth(handlers: Record<string,HandlerFn>) {
  return async (req: NextRequest) => {
    const fn = handlers[req.method!]
    if (!fn) return new NextResponse('Method not allowed', { status:405 })
    return fn(req)
  }
}
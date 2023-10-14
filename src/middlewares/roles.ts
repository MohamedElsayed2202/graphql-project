export const checkRole = (role: string, userRole: string): boolean =>  {
    if(role === userRole){
        return true
    }
    return false
}


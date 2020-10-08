const errors = [
    {
        id: '1',
        title: 'Internal server error',
        content: 'Something unexpected happened. Please try again later.',
        destination: '/courses',
        label: 'Back to courses'
    },
    {
        id: '2',
        title: 'Duplicate email',
        content: 'The email you submitted is already registered.',
        destination: '/login',
        label: 'Login'
    },
    {
        id: '3',
        title: 'Failed authentication',
        content: 'Registered already? If so, kindly check email and password.',
        destination: '/login',
        label: 'Login'
    }
]

export function getAllErrorIds() {
    return errors.map(error => {
        return {
            params: {
                id: error.id
            }
        }
    })
}

export function getErrorData(id) {
    const errorData = errors.find(error => error.id == id)
    return errorData
}
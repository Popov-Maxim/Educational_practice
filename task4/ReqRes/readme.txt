use body for tests reg and save id account in 'userId'
check status = 200 and select next request(login)

check 'login' 
check status = 200 and select next request('user')

get user by saved id
check status = 200 and select next request(null). this is the last request
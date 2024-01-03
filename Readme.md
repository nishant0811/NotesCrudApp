# INSTRUCTIONS

First install all the dependencies at the root of the directory using 
```
npm i
```

To run the app 

```
npm start
```

The Server starts at PORT 3000;

All the API's are same as mentioned in the Instruction. Also adding postman collection for youe reference.

https://api.postman.com/collections/11536364-08f71daa-4076-44ce-b51f-47bb0f973392?access_key=PMAT-01HK81EFMZYDZFYAMXYQ35CPR8

To run the tests

```
npm test
```


If you get Token Expired then hit the below route with "refreshToken" in the body

```
/api/auth/token
```
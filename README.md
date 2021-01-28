## This is for nodejs-interview code 

You could fork this repository for coding.

## Usage
1. create `config/config.json`  
    add content:
    ```json=
    {
      "development": {
        "username": {{ DB_USERNAME }},
        "password": {{ DB_PASSWORD }},
        "database": {{ DATABASE_NAME }},
        "host": "localhost",
        "dialect": "mysql"
      },
      "test": {
        "username": "",
        "password": "",
        "database": "",
        "host": "127.0.0.1",
        "dialect": "mysql"
      },
      "production": {
        "username": "",
        "password": "",
        "database": "",
        "host": "127.0.0.1",
        "dialect": "mysql"
      }
    }
    ```
2. create `.env`  
    add content:
    ```bash=
    SECRET={{jwt sign secret}}
    ```
3. install packages
    ```bash=
    npm install
    ```
4. run app
    ```bash=
    npm run start
    ```
5. check [localhost:8088](http://localhost:8088)
6. login
    ```
    account: Leo
    password: Leo
    ```

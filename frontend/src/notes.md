# Notes 

Log in and register for an account
Once logged in, should see a screen to create a hive if they don't have any hives in their account.
If they have hives in their account, the should see all hives and be able to click them to show all gifts. 

## To add A gift
POST /gift-routes/gifts

{
    "gift": "Öronmuffar",
    "tags": ["Tomten", "Jul"],
    "bought": true,
    "hiveId": "65775277d6ddd92f1b841cba"
}

## To add a hive
POST /gift-routes/hives

{
    "name": "Luna"
}


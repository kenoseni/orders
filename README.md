Orders

## Description

Admin has functionality to `register a user`, `login` `create an order`, `delete an order` `delete orders for a specific customer` `get all orders` `get all orders for a specific customer` `get a single order`

## Assumptions made

1. The user creating an order can only use a user id to do so gotten from his token
2. bookingDate was not passed as arguments also to prevent inputing past dates or future dates and validating for those. the booking dates were generated as the order were made
3. Register functionality is for adding another user
4. The validation to check if a user was the one that created a resource before deletion was ignored. So far you have a valid token you can delete any resource
5. Pagination will be ignored if no arguments are passed to fetch all orders, but if the right arguments are passed, pagination is used.

## Installation

To run locally, use the command below to install all dependencies

```
$ npm install
```

## Running the app

```bash
# development
$ npm run dev

# production mode
$ npm start
```

## Test

This feature is coming up

## Request body for various functionalities

Register Mutation

```
register(data: {
    email: "presidente@gmail.com"
    password:"1234567890"
    phone: "+2347038019341"
    name: "Olusegun Obasanjo"
  }) {
    user {
      uid
      name
      email
      phone
    }
  }
```

Login Mutation

```
login(data: {
    email: "presidente@gmail.com"
    password:"1234567890"
  }) {
    user {
      uid
      name
      email
      phone
    }
    token
  }
```

CreateOrder Mutation

```
createOrder(data: {
    title: "iphone 5"
    address: {
      city: "Hamburg"
      country: "Germany"
      street: "woo woohh ahhh"
      zip: "09289"
    }
  }){
    uid
    bookingDate
    customer {
      email
      phone
      name
    }
    address {
      city
      country
      street
      zip
    }
  }
```

DeleteOrder Mutation

```
deleteOrder(data: {
    uid: "Xr5LIDxRdgytZ3WTmrUr"
  }) {
    uid
}
```

Delete Customer Order Mutation

```
deleteCustomerOrders(data: {email: "president@gmail.com"}) {
    orders {
      uid
      title
      bookingDate
    }
}
```

Get all Orders Query

```
orders(data: {page: 2 limit: 5}){
    orders {
      uid
      title
    }
    count
}
```

Get one Order Query

```
order(data: {uid: "9Q1TFpgxJr5zA8jU7vEB"}) {
    uid
    title
    customer {
      uid
      name
      email
      phone
    }
    bookingDate
}
```

Get all Orders of a Customer Query

```
getCustomerOrders(data: {email: "president@gmail.com"}) {
    orders {
      uid
      title
      customer {
        name
      }
    }
}
```

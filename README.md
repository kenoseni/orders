Orders

## Description

Admin has functionality to `register a user`, `login` `create an order`, `delete an order` `delete orders for a specific customer` `get all orders` `get all orders for a specific customer` `get a single order`

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
    token
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

const Order = require("./menu");

class CustomerSessionEvent {
  constructor({ eventName, data, message }) {
    this.data = data;
    this.eventName = eventName;
    this.message = message;
  }
}

const orderOptions = {
2: "Classic Cheeseburger - $7.99",
3: "Grilled Chicken Sandwich - $8.99",
4: "Beef Stew with White Rice - $12.99",
5: "French Fries - $3.99",
6: "Jollof Rice with Chicken - $10.99",
7: "Shrimp Fried Rice - $13.99",
8: "Vanilla Ice Cream - $4.99",
9: "Blueberry Pancakes - $8.99",
10: "Vegetable Noodles - $9.99",
11: "Chicken Shawarma Wrap - $6.99",
12: "Fried Yam with Spicy Sauce - $7.99",
13: "Crispy Fried Fish with Plantain - $11.99",
14: "Grilled Plantain with Pepper Sauce - $4.99",
15: "Whole Wheat Bread - $2.99",
16: "Beans and Plantain Pottage - $9.99",


};

const commandOptions = {
  1: "Place an Order",
  99: "Checkout an Order",
  98: "See Order History",
  97: "See Current Order",
  0: "Cancel Order",
};

class CustomerSession {
  constructor({ io }) {
    this.customer = null;
    this.orders = [];
    this.currentOrder = null;
    this.socket = io;
  }

  emitEvent(event) {
    this.socket.emit(event.eventName, event);
  }

  placeNewOrder() {
    if (!this.currentOrder) {
      this.currentOrder = new Order();
      let message = "Select Menu to make your order: <br />";
      for (let key of Object.keys(orderOptions)) {
        message += `${key}- ${orderOptions[key]} <br />`;
      }
      console.log(message);
      return message;
    } else {
      return "Your order is currently being processed. You have the option to include additional items to your order.";
    }

  }

  displayOptions() {
    let message = "";
    const showOptions = (initial_message, options) => {
      message += initial_message;
      for (let key of Object.keys(options)) {
        message += `${key}- ${options[key]} \n`;
      }
      console.log(message);
    };
    if (!this.currentOrder) {
      showOptions("These are the possible commands: \n", commandOptions);
    } else {
      showOptions("These are the items that you can order: \n", orderOptions);
    }
    return message;
  }

  //   displayItems() {
  //     this.emitEvent(
  //       new CustomerSessionEvent("display_list_of_items", orderOptions, null)
  //     );
  //   }

  addItemToCurrentOrder(menuItemNo) {
    if (!this.currentOrder) {
      return "Please place an order to be able to add items to it.";
    } else {
      this.currentOrder.addItemToOrder(orderOptions[menuItemNo]);
      return `Successfully added item to order: ${orderOptions[menuItemNo]}`;
    }
  }

  viewCurrentOrder() {
    const countOccurence = (value, array) => {
      let count = 0;
      for (let item of array) {
        if (item == value) count += 1;
      }
      return count;
    };
    if (!this.currentOrder) {
      return "There is no order in Progress. <br />Please input 1 to start placing an order.";
    }
    let message = "The items in your order are: <br />";
    const orderWithoutDuplicates = new Set(this.currentOrder.items);
    for (let item of Array.from(orderWithoutDuplicates)) {
      message += `${countOccurence(item, this.currentOrder.items)} portion${
        countOccurence(item, this.currentOrder.items) > 1 ? "s" : ""
      } of ${item} <br />`;
    }
    message +=
      "<br />To checkout your order, input 99 <br />To cancel your order, input 0 ";
    return message;
  }

  checkoutOrder() {
    if (!this.currentOrder)
      return "There is no order in Progress to Checkout. <br />To place an order, input 1";
    else {
      this.orders.push(this.currentOrder);
      this.currentOrder = null;
      return "Order Checked Out Successfully. <br />To place a new order, input 1. <br />To See Order History, input 98";
    }
  }

  cancelOrder() {
    if (!this.currentOrder)
      return "There is no order in progress to cancel. <br />To place an order, input 1.";
    else {
      this.currentOrder = null;
      return "Order Canceled Successfully!<br />To place a new order, input 1";
    }
  }

  viewOrderHistory() {
    if (this.orders.length == 0)
      return "You've not placed any orders. <br />Input 1 to start placing an order.";
    let message = "";
    let count = 1;
    for (let order of this.orders) {
      message += `Order ${count} <br />`;
      message += order.viewOrder();
      message += "<br /> <br />";
      count += 1;
    }
    console.log(message);
    return message;
  }
}

module.exports = CustomerSession;

# ChopFull

A Real-Time resturant chatbot application to assist customers in placing orders for their preferred meals.

## Contents
- [Objective](#objective)
- [Purpose](#purpose)
- [Getting Started](#getting-started)
    - [Prerequisite](#prerequisite)
- [Requirements](#requirements)
    - [Setup](#setup)
- [Tools](#tools)
- [Deployment](#deployment)
- [Authors](#author)
- [Contributions](#contributions)

___
___

## Objective
The aim of this application is to simplify the process of ordering for customers. It achieves this by providing options for customers to choose from, and the backend of the application includes a chat feature that can respond to these options in real-time.

## Purpose
This project has been submitted in partial fulfilment of the requirements for the Higher Diploma Certification in Software Engineering program at [AltSchool Africa](https://www.altschoolafrica.com/)

## Getting Started
### Prerequisite 
To run and test this application successfully, you will need the following components:

- Web Browser - A tool for interacting with the frontend (e.g. Chrome, Edge, Opera)
- Node - A JavaScript runtime environment
- IDE/Text Editor - An application for interacting with the source code (e.g. VS Code, Atom, Sublime Text, Emacs)
- CLI - A Command Line Interface for cloning and starting the server on your local machine (e.g. Terminal for Mac, Git Bash, WSL, or CMD for Windows).

### Requirements
- The ChatBot interface should be designed to resemble a chat interface.
- The interface should not require authentication, but user sessions should be stored based on devices.
- Upon landing on the chatbot page, the bot should present the following options to the customer:
  - Select 1 to Place an order
  - Select 99 to checkout order
  - Select 98 to see order history
  - Select 97 to see current order
  - Select 0 to cancel order
- When a customer selects "1", the bot should return a list of items from the restaurant. The customer should be able to select their preferred items from the list using a number selection system and place an order.
- When a customer selects "99" to check out an order, the bot should respond with "Order placed". If there are no orders to place, the bot should respond with "No order to place". The customer should also be provided with the option to place a new order.
- When a customer selects "98", the bot should be able to return all placed orders.
- When a customer selects "97", the bot should be able to return the current order.
- When a customer selects "0", the bot should cancel the order if one exists.

### Setup
To start up the application, follow the following steps
- Step 1: Open your terminal/CLI
- Step 2: Clone the repository
    ```sh
    git clone this [repo](https://github.com/Lydia02/ChopFull.git) 
    ```
- Step 3: Navigate into the project directory/folder
    ```sh
    cd chopFull/
    ```
- Step 4: Switch to the dev branch to run locally
    ```sh
    git checkout dev
    ```
- Step 5: Install all the project dependencies
    ```sh
    npm install
    ```
- Step 6: Start the server
    ```sh
    npm start
    ```
- Step 7: Open the url displayed on the terminal in your web browser and explore the application

### Tools
The tools used for creating the application include:

- Client-side: HTML, CSS, JavaScript, and Socket.io-client
- Server-side: Node, Socket.io, Express, Nodemon, and dotenv
- Text Editor: VS Code
- Version Control: Git and GitHub


## Deployment
Application is live at [ChopFull](https://chopfull-ryww.onrender.com) 🚀🚀🚀

## Author
Lydia Ojoawo.


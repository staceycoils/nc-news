# Northcoders News App

This repository conatins the backend files for my 2022 Northcoders Project, a small website for hosting user-submitted articles. This encompasses the frontend files, a React-based app that uses my NC-News API to present user-submitted articles. 

The hosted app can be located at https://staceycoils-nc-news.netlify.app/. You can use the buttons and links to navigate, or enter the direct address into the address bar. Submitting articles, comments and topics, and voting on articles and comments, all require the user to be logged in. This app does not use user authentication, so to login, navigate to the <b>/login</b> page and enter one of the following usernames:
<li>tickle122</li>
<li>grumpy19</li>
<li>happyamy2016</li>
<li>cooljmessy</li>
<li>weegembump</li>
<li>jessjelly</li>
<br />

The backend files are a seperate repository, located at https://github.com/staceycoils/backend_project.

## Setup

### Requirements

This repo requires the minimum versions of the following:

  <li>npm: 8.3.0</li>
  <li>node: 17.3.0</li>
  <br/>

### Installation

1) Clone the repository into the selected folder by using: <br>
> <code>git clone https://github.com/staceycoils/nc-news.git</code>

2) Run:
> <code>npm init</code>

to install npm into the project. You can add -y to the end to omit all required inputs and install npm immediately.

3) Install the required node modules by running:
> <code>npm i</code>

### Running

If any local changes are made, you can preview them use using:
> <code>npm start</code>

This will host the project on a local port as displayed in the console. This can be opened in your browser at <b>localhost:[<i>port number</i>]</b>.
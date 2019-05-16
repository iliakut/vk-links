# vk-links
Vue.js app based on vk-api, node.js (require)

the project contains server and client parts.
if you want to use server part you need to create access_token.js file:
"
const my_token = 'your_token';
exports.my_token = my_token;
"
Front - Vue.js
Back - Node.js

Fron will sent two id of users of vk.com then send it to Backend
then Back will use vk.api to fint links (mutual friends and mutual of mutual friends or three handshakes) between two users 

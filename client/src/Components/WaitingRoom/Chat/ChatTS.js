"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./Chat.css");
const Messages_1 = require("../Messages/Messages");
;
const Chat = ({ chat }) => {
    return (React.createElement("div", { style: { height: '400px', width: '100%' } },
        React.createElement(Messages_1.default, { chat: chat })));
};
exports.default = Chat;

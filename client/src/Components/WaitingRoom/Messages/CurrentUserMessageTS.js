"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./Message.css");
const CurrentUserMessage = ({ chat }) => {
    return (React.createElement("div", { className: 'messageContainer justifyEnd' },
        React.createElement("p", { className: 'sentText pr-10' }, chat.username),
        React.createElement("div", { className: 'messageBox backgroundBlue' },
            React.createElement("p", { className: 'messageText colorWhite' }, chat.text))));
};
exports.default = CurrentUserMessage;

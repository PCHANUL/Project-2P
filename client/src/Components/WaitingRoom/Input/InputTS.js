"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_cookies_1 = require("react-cookies");
require("./Input.css");
const Input = ({ sendChat }) => {
    const [message, setMessage] = React.useState('');
    return (React.createElement("form", { className: 'form' },
        React.createElement("input", { type: 'text', className: 'input', placeholder: '\uBA54\uC2DC\uC9C0\uB97C \uC785\uB825\uD558\uC138\uC694', value: message, onChange: (e) => setMessage(e.target.value), onKeyPress: (e) => {
                // e.preventDefault();
                if (message === '')
                    return;
                const text = { username: react_cookies_1.default.load('username'), text: message };
                if (e.key === 'Enter') {
                    sendChat(text, react_cookies_1.default.load('username'));
                    setMessage('');
                }
            } }),
        React.createElement("button", { className: 'sendButton', type: 'submit', onClick: (e) => {
                e.preventDefault();
                if (message === '')
                    return;
                const text = { username: react_cookies_1.default.load('username'), text: message };
                sendChat(text, react_cookies_1.default.load('username'));
                setMessage('');
            } }, "Send")));
};
exports.default = Input;

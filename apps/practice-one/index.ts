
type EmitterProps = {
  name: string;
  email: string;
}

const { users } = require("./users");

console.log("Hello world. I have started learning Node.js", users);

// Register listener
const eventEmitter = require("events");
const emitter = new eventEmitter();

emitter.on("emitterCall", async (data: EmitterProps) => {
  console.log("Calling the emitter " + data.name + " " + data.email);
});

// Raise -> calling the event
emitter.emit("emitterCall", { name: "Aleksandar", email: "aleksandar@gmail.com" });
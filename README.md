# chat-server-gg
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/PhearZerp/chat-server-gg)

This project aims to demonstrate the basics of scaleable **WebSocket** (and|or) **REST** servers.

---

### Technology 
- [**uWebsocket.js**](https://github.com/uNetworking/uWebSockets.js/) for **WebSockets** and **REST API** 
- [**Redis**](https://redis.io/) for **Pub/Sub**
- [**BullMQ**](https://docs.bullmq.io/) for **MessageQueue** 
- [**Couchdb**](http://couchdb.apache.org/) for **Storage**. 

### Terms
- [**Message**](https://en.wikipedia.org/wiki/Message_passing): An Object that is produced or consumed by messaging 
  passing services such as **WebSocket**, **MessageQueue**, **Pub/Sub** or **REST**
- [**Publish/Subscribe**](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) ***(Pub/Sub)***: 
  Messaging pattern where "senders of **Messages**" (aka **Publishers**) have no knowledge of "specific **Message** 
  receivers" (aka **Subscribers**)
- [**Message Queue**](https://en.wikipedia.org/wiki/Message_queue) ***(MQ)***: Sibling of the **Pub/Sub** pattern, 
  used when **Subscribers** and **Publishers** do not need to interact simultaneously with the **MQ**. This means 
  **Messages** are placed into a **Queue** to be processed by receiving parties at a later time
- [**Message Broker**](https://en.wikipedia.org/wiki/Message_broker): is an intermediary computer program module that 
  translates a message from the formal messaging protocol of the sender to the formal messaging protocol of the receiver.
- [**Queue/Job Worker**](https://en.wikipedia.org/wiki/Job_scheduler):  Application that preforms tasks like 
  **Batch Processing** of **Messages** in a **MessageQueue**. Often combined with **Job Scheduling** or a **Job Scheduler**

### Message Broker Logic
- All **Messages** are sent to the **Publisher** and **MQ**.
- All **Brokers** emit **Subscription** **Messages** to **Clients**. 
- All **Workers** will store **Queued** **Messages** in **Couchdb**

---

# [The Following is a Work in Progress]

# Docker

Working in containers is much more efficient than a few stand-alone VPS.
```bash
# Init Swarm if not already configured
docker swarm init

docker stack deploy -c docker-compose.yml wss
```

# Vagrant VPS Mock

 This will deploy multiple instances to your local Vitualbox Provider similar to how
it should be deployed in production. 
 
### Requirements:
 - [Vagrant](https://www.vagrantup.com/)
 - [Vagrant-HostsUpdater](https://github.com/agiledivider/vagrant-hostsupdater)

```bash
# To suppress auth popups follow: 
# https://github.com/agiledivider/vagrant-hostsupdater#suppressing-prompts-for-elevating-privileges
vagrant up
```
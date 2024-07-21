import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'test-group' });

const consumeMessage = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'my-topic' });

  await consumer.run({
    eachMessage: async ({ message }) => {
      console.log({
        key: message.key.toString(),
        value: message.value.toString(),
      });
    },
  });
};

consumeMessage().catch(console.error);

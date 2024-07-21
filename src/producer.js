import { Kafka, Partitioners } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});

const produceMessage = async () => {
  await producer.connect();
  await producer.send({
    topic: 'my-topic',
    messages: [{ key: 'key1', value: 'Hello KafkaJS user!' }],
  });

  await producer.disconnect();
};

produceMessage().catch(console.error);

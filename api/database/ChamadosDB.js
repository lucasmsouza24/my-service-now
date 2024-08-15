// db.js
import AWS from 'aws-sdk';

class ChamadosDB {

    constructor() {
        
        // O AWS SDK automaticamente carrega as credenciais e a região dos arquivos padrão
        AWS.config.update({ region: 'us-east-1' });
        
        this.dynamoDb = new AWS.DynamoDB.DocumentClient();
    }
    
    // list all items
    async listAllItems() {

        const params = {
            TableName: 'chamados'
        }

        try {
            const data = await this.dynamoDb.scan(params).promise();
            return data.Items;
        } catch (error) {
            console.error('Erro ao consultar DynamoDB:', error);
        }
    }

    // returns item based on key
    async getChamadoById(numero_chamado) {

        const params = {
            TableName: 'chamados',
            Key: {
                'numero_chamado': numero_chamado
            }
        }

        try {
            const result = await this.dynamoDb.get(params).promise();
            return result.Item;
        } catch (error) {
            console.error('Erro ao consultar DynamoDB:', error);
        }
    }

    // insert item on dynamodb
    async insertItem(chamado) {
        const params = {
            TableName: tableName,
            Item: chamado
        };

        try {
            await dynamoDb.put(params).promise();
            console.log('Item inserido com sucesso:', item);
            return item;
        } catch (error) {
            console.error('Erro ao inserir item:', error);
        }
    }

}

export default ChamadosDB;
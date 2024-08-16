// db.js
import AWS from 'aws-sdk';

class ChamadosDB {

    constructor() {
        
        // O AWS SDK automaticamente carrega as credenciais e a região dos arquivos padrão
        AWS.config.update({ region: 'us-east-1' });
        
        this.dynamoDb = new AWS.DynamoDB.DocumentClient();
        this.TableName = 'chamados';
    }
    
    // list all items
    async listAllItems() {

        const params = {
            TableName: this.TableName
        }

        try {
            const data = await this.dynamoDb.scan(params).promise();
            return data.Items;
        } catch (error) {
            console.error('Erro ao consultar DynamoDB:', error);
        }
    }

    async listItemsByStatus(status) {

        console.log(status)
        
        const params = {
            TableName: this.TableName,
            FilterExpression: '#status = :status',
            ExpressionAttributeNames: {
                '#status': 'status',  // Substituição para a palavra reservada
            },
            ExpressionAttributeValues: {
                ':status': status,
            },
        };
    
        try {
            const result = await this.dynamoDb.scan(params).promise();
            return result.Items;
        } catch (error) {
            console.error('Erro ao escanear itens:', error);
            return [];
        }
    }

    // returns item based on key
    async getChamadoById(numero_chamado) {

        const params = {
            TableName: this.TableName,
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
            TableName: this.TableName,
            Item: chamado
        };

        try {
            await this.dynamoDb.put(params).promise();
            console.log('Item inserido com sucesso:', chamado);
            return chamado;
        } catch (error) {
            console.error('Erro ao inserir item:', error);
        }
    }

    async count() {
        const params = {
            TableName: this.TableName,
            Select: 'COUNT'
        };

        try {
            const result = await this.dynamoDb.scan(params).promise();
            return result.Count
        } catch (error) {
            console.log(error)
        }
    }

}

export default ChamadosDB;
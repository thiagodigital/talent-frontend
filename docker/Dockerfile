FROM node:20

# Cria diretório de trabalho
WORKDIR /app

# Copia apenas package.json e lock para instalar dependências primeiro (cache melhor)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante da aplicação
COPY . .

# Expõe porta do Vite
EXPOSE 5173

# Comando padrão (pode ser sobrescrito)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

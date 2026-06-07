# PDF Machine

Aplicação web fullstack para conversão de arquivos DOCX em PDF de forma simples, rápida e segura,
preservando formatação, imagens, tabelas e estilos do documento original.

## Produção: https://pdf-machine.vercel.app

---

## Tecnologias

### Frontend
- React
- TypeScript
- Axios
- Vite
- Notistack (notificações)

### Backend
- Node.js
- Express
- Busboy (upload de arquivos)
- LibreOffice (conversão DOCX → PDF)

### Infraestrutura
- Docker
- Render (backend)
- Vercel (frontend)

## Como rodar o projeto

### Backend

```bash
cd backend
npm install
npm run dev
```

#### Build de produção

```bash
npm run build
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Fluxo de aplicação

1. Usuário faz upload de arquivo .docx
2. Frontend envia para o backend via API
3. Backend processa upload com Busboy
4. Arquivo é salvo temporariamente
5. Conversão para PDF via LibreOffice
6. PDF é retornado para download

## Funcionalidades

- Upload de arquivos DOCX
- Validação de tipo de arquivo
- Conversão automática para PDF
- Preservação de fontes, imagens, tabelas e formatação
- Download do arquivo convertido
- Feedback visual (loading e notificações)
- Tratamento de erros de upload e conversão

## Observações
- Arquivos são armazenados temporariamente no servidor
- Não há persistência de dados
- Conversão depende do LibreOffice instalado no ambiente de execução

## Autor
Lucas Patrício

// server.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors'); // CORS 패키지 임포트

// Express 앱 생성
const app = express();
const port = 3000;


// CORS 설정
app.use(cors()); // 모든 출처에서의 요청을 허용합니다.


// Express 미들웨어 설정
app.use(express.json()); // JSON 파싱을 위한 미들웨어

// Todo 데이터베이스 (메모리 내 저장소 예시)
let todos = [
  { id: 1, name: "Learn JavaScript", status: 1 },
  { id: 2, name: "Learn Express", status: 0 },
];

// /todos 경로에 대한 GET 요청 처리
app.get('/todos', (_, res) => {
  res.json(todos);
});

// /todos 경로에 대한 POST 요청 처리
app.post('/todos', (req, res) => {
  const newTodo = req.body;
  
  // 데이터 유효성 검사
  if (!newTodo.name || newTodo.status === undefined) {
    return res.status(400).json({ error: 'Name and status are required' });
  }

  // 사용 가능한 ID 찾기
  let newId = 1;
  while (todos.some(todo => todo.id === newId)) {
    newId++;
  }
  
  newTodo.id = newId; // 새로운 ID를 할당
  todos.push(newTodo); // 데이터베이스에 추가 (메모리 내 저장소)
  res.status(201).json(newTodo); // 생성된 리소스를 JSON으로 반환
});


app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const updatedTodo = req.body;
  const todoId = parseInt(id, 10); // 요청 파라미터에서 id를 정수로 변환

  // 데이터 유효성 검사
  if (isNaN(todoId)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }
  if (updatedTodo.status !== undefined && ![0, 1].includes(updatedTodo.status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  const index = todos.findIndex(todo => todo.id === todoId);

  if (index === -1) {
    // Todo 항목이 존재하지 않으면 404 응답
    return res.status(404).json({ error: 'Todo not found' });
  }

  // 기존 Todo 항목 업데이트
  todos[index] = { ...todos[index], ...updatedTodo };
  res.json(todos[index]); // 업데이트된 Todo 항목 반환
});

// /todos/:id 경로에 대한 DELETE 요청 처리 (부분삭제)
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  const todoId = parseInt(id); // 요청 파라미터에서 id를 정수로 변환

  // Todo 항목 삭제
  todos = todos.filter(todo => todo.id !== todoId);

  // 성공적으로 삭제되었음을 응답
  res.status(204).end();
});


// /todos 경로에 대한 DELETE 요청 처리 (전체 삭제)
app.delete('/todos', (_, res) => {
  todos = [];
  res.status(204).end();
});

// /todos/completeAll 경로에 대한 POST 요청 처리 *ERROR로 PUT -> POST 로 변경
app.post('/todos/completeAll', (req, res) => {
  console.log('Received POST /todos/completeAll request');
  console.log('Request body:', req.body); // 빈 본문 로그 추가

  todos = todos.map(todo => ({ ...todo, status: 1 }));

  res.json(todos); // 업데이트된 Todo 리스트 반환
});

// HTTP 서버 생성
const server = http.createServer(app);

// WebSocket 서버 생성 및 '/ws' 경로 설정
const wss = new WebSocket.Server({ server, path: '/ws' });

wss.on('connection', (ws) => {
  console.log('New WebSocket connection established');

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    // 클라이언트에게 메시지 보내기
    ws.send(`Server received: ${message}`);
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});


//completeAll 오류 처리
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// 서버 시작
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
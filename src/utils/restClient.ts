import { getUrl } from "./utils";

const baseUrl = "http://localhost:4747/";
const api = "milkpay-api/";
const apiVersion = "v1/";
const userRoutes = "user";
const token = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI0VWx3SE5oQkpTSmlmdktIZENJbHNETjRXOXBJNnVyb1FxNElTeHhvRC1jIn0.eyJleHAiOjE2NTA3NDI5MjgsImlhdCI6MTY1MDc0MjUwOCwianRpIjoiZTA3YzcwZDAtODlkMy00MGYwLWE4MTUtODQzZDk5YTJiNWU2IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo5MDkxL2F1dGgvcmVhbG1zL01pbGtQYXkiLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImFjY291bnQiXSwic3ViIjoiNWNkZjBhZTctOWJjMS00MWRkLWExYTItYzBjNDIxZTc0Y2MwIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWlsa3BheS1hcGkiLCJzZXNzaW9uX3N0YXRlIjoiZDdjNmM2YWUtMzNiYy00OTMyLWExM2MtODBmZjIwZGM2NzE5IiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIiwidXNlciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsibWFuYWdlLXVzZXJzIiwidmlldy11c2VycyIsInF1ZXJ5LWdyb3VwcyIsInF1ZXJ5LXVzZXJzIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6Im1pbGtwYXktYWRtaW4ifQ.Qz6RdGRP8jfPYR6p7RTvGL_h-07dzYEX5C_JAsm5ZQo8PmqXxZqxyxBSo8Y2lG_0pArH3NufXT712Ioac6ZvK0ucwHkaMkg1SmoIjCO7fxc5H_Q4Dy8IYV0FQ-vnlKbDBN5tX5WGmFfWyog0SVV1FTYnH16TryJHdobGGYovBdNu3KgrfdE2sJZYYx_kbZY3X3AuoaM_r4NEk3jIiTrGHi2-N4CYtV3HLxdnlknkA93knS2wtwdDPSLWaHNLHQoRbRyazVow5rzPuQ-6myoW7q1qE7SgQcXxmiSyOhWzR5yb7dRxVba5hIurhAXcCgF8Gjcz3UqwT5zcxyxRZLmhTg";

export function createAccount(document: string, password: string): Promise<Response> {
    const userDto = {document, password};
    const url = getUrl(baseUrl, api, apiVersion, userRoutes);
    console.log(url);
    
    const request: RequestInit = {
        headers: {
            "Authorization" : token,
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(userDto),
    }
    
    return fetch(url, request);
}
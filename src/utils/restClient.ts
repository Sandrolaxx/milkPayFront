import { getUrl } from "./utils";

const baseUrl = "http://localhost:4747/";
const api = "milkpay-api/";
const apiVersion = "v1/";
const userRoutes = "user";
const token = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI0VWx3SE5oQkpTSmlmdktIZENJbHNETjRXOXBJNnVyb1FxNElTeHhvRC1jIn0.eyJleHAiOjE2NTI1NjU3MDIsImlhdCI6MTY1MjU2NTI4MiwianRpIjoiOWRiMTA1MWYtZGNlOS00M2U1LTg3NjAtMTYwOWY0MTM5Mzk5IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo5MDkxL2F1dGgvcmVhbG1zL01pbGtQYXkiLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImFjY291bnQiXSwic3ViIjoiNWNkZjBhZTctOWJjMS00MWRkLWExYTItYzBjNDIxZTc0Y2MwIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWlsa3BheS1hcGkiLCJzZXNzaW9uX3N0YXRlIjoiNTc5Mjk1MDMtNTlhYi00MTdmLTkxMTAtZWUzMzQyNGJkYzc5IiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIiwidXNlciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsibWFuYWdlLXVzZXJzIiwidmlldy11c2VycyIsInF1ZXJ5LWdyb3VwcyIsInF1ZXJ5LXVzZXJzIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6Im1pbGtwYXktYWRtaW4ifQ.SlCNS82zwDFVjoNiv7DwjIblAoMtI0aDjB4sK2qwnC3rb3B9xtcjgUu1bnlRAqz79v6BRmF3Q9nvP85RCU0epdXGM4R8WGCaJxa5rNpK4BABqJ9boK7Etjqlqfgb0UDNZFP_d0Db9oqwSSB5VVushe_psp_hLXndEUXlZgoZwqF_JMhixLjOvQ9Fvedh1LXQYKue_Jmte3UZgyDrwGeU6KA7zzgIFwGaO0YdohMQ2VnJNwrsoyn2CbwjSc4pNszEQIYBOWcBm_TupE9hvwf8GJ5nV6acd-yWdKmVl6tJCmmne5HcbsOKH0VL6wvRq1cct0jOigfKaqNI04rGkyG2KQ";

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
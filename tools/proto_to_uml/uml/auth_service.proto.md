# Package: faas

<div class="comment"><span></span><br/></div>

## Imports

| Import | Description |
|--------|-------------|



## Options

| Name | Value | Description |
|------|-------|-------------|



## Service: AuthService
<div style="font-size: 12px; margin-top: -10px;" class="fqn">FQN: faas</div>

<div class="comment"><span></span><br/></div>

### AuthService Diagram

```mermaid
classDiagram
direction LR
class AuthService {
  <<service>>
  +CreateUser(UserCredentialsRequest) User
}
AuthService --> `UserCredentialsRequest`
AuthService --> `User`

```

| Method     | Parameter (In)         | Parameter (Out) | Description |
|------------|------------------------|-----------------|-------------|
| CreateUser | UserCredentialsRequest | User            |             |


## Enum: UserRole
<div style="font-size: 12px; margin-top: -10px;" class="fqn">FQN: faas.UserRole</div>

<div class="comment"><span></span><br/></div>

| Name  | Ordinal | Description |
|-------|---------|-------------|
| USER  | 0       |             |
| ADMIN | 1       |             |



### UserRole Diagram

```mermaid
classDiagram
direction LR
%% 

class UserRole{
  <<enumeration>>
  USER
  ADMIN
}
```
### User Diagram

```mermaid
classDiagram
direction LR

%% 

class User {
  + uint32 user_id
  + string username
  + UserRole role
  + uint32 updated_at_timestamp
}
User --> `UserRole`

```
### UserCredentialsRequest Diagram

```mermaid
classDiagram
direction LR

%% 

class UserCredentialsRequest {
  + string username
  + string password
}

```
### VerifyUserRequest Diagram

```mermaid
classDiagram
direction LR

%% 

class VerifyUserRequest {
  + uint32 user_id
}

```
### ChangeUserPasswordRequest Diagram

```mermaid
classDiagram
direction LR

%% 

class ChangeUserPasswordRequest {
  + uint32 user_id
  + string old_password
  + string new_password
}

```

## Message: User
<div style="font-size: 12px; margin-top: -10px;" class="fqn">FQN: faas.User</div>

<div class="comment"><span></span><br/></div>

| Field                | Ordinal | Type     | Label | Description |
|----------------------|---------|----------|-------|-------------|
| user_id              | 1       | uint32   |       |             |
| username             | 2       | string   |       |             |
| role                 | 3       | UserRole |       |             |
| updated_at_timestamp | 4       | uint32   |       |             |




## Message: UserCredentialsRequest
<div style="font-size: 12px; margin-top: -10px;" class="fqn">FQN: faas.UserCredentialsRequest</div>

<div class="comment"><span></span><br/></div>

| Field    | Ordinal | Type   | Label | Description |
|----------|---------|--------|-------|-------------|
| username | 1       | string |       |             |
| password | 2       | string |       |             |




## Message: VerifyUserRequest
<div style="font-size: 12px; margin-top: -10px;" class="fqn">FQN: faas.VerifyUserRequest</div>

<div class="comment"><span></span><br/></div>

| Field   | Ordinal | Type   | Label | Description |
|---------|---------|--------|-------|-------------|
| user_id | 1       | uint32 |       |             |




## Message: ChangeUserPasswordRequest
<div style="font-size: 12px; margin-top: -10px;" class="fqn">FQN: faas.ChangeUserPasswordRequest</div>

<div class="comment"><span></span><br/></div>

| Field        | Ordinal | Type   | Label | Description |
|--------------|---------|--------|-------|-------------|
| user_id      | 1       | uint32 |       |             |
| old_password | 2       | string |       |             |
| new_password | 3       | string |       |             |






<!-- Created by: Proto Diagram Tool -->
<!-- https://github.com/GoogleCloudPlatform/proto-gen-md-diagrams -->

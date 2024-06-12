# Package: faas

<div class="comment"><span></span><br/></div>

## Imports

| Import       | Description |
|--------------|-------------|
| common.proto |             |



## Options

| Name | Value | Description |
|------|-------|-------------|



## Service: RuntimeService
<div style="font-size: 12px; margin-top: -10px;" class="fqn">FQN: faas</div>

<div class="comment"><span></span><br/></div>

### RuntimeService Diagram

```mermaid
classDiagram
direction LR
class RuntimeService {
  <<service>>
  +CreateRuntime(CreateRuntimeRequest) BriefRuntime
}
RuntimeService --> `CreateRuntimeRequest`
RuntimeService --> `BriefRuntime`

```

| Method        | Parameter (In)       | Parameter (Out) | Description |
|---------------|----------------------|-----------------|-------------|
| CreateRuntime | CreateRuntimeRequest | BriefRuntime    |             |



### CreateRuntimeRequest Diagram

```mermaid
classDiagram
direction LR

%% 

class CreateRuntimeRequest {
  + string tag
  + string dockerfile
}

```
### BriefRuntime Diagram

```mermaid
classDiagram
direction LR

%% 

class BriefRuntime {
  + string tag
  + string registry_url
}

```
### DetailedRuntime Diagram

```mermaid
classDiagram
direction LR

%% 

class DetailedRuntime {
  + string tag
  + string registry_url
  + string dockerfile
}

```

## Message: CreateRuntimeRequest
<div style="font-size: 12px; margin-top: -10px;" class="fqn">FQN: faas.CreateRuntimeRequest</div>

<div class="comment"><span></span><br/></div>

| Field      | Ordinal | Type   | Label | Description |
|------------|---------|--------|-------|-------------|
| tag        | 1       | string |       |             |
| dockerfile | 2       | string |       |             |




## Message: BriefRuntime
<div style="font-size: 12px; margin-top: -10px;" class="fqn">FQN: faas.BriefRuntime</div>

<div class="comment"><span></span><br/></div>

| Field        | Ordinal | Type   | Label | Description |
|--------------|---------|--------|-------|-------------|
| tag          | 1       | string |       |             |
| registry_url | 2       | string |       |             |




## Message: DetailedRuntime
<div style="font-size: 12px; margin-top: -10px;" class="fqn">FQN: faas.DetailedRuntime</div>

<div class="comment"><span></span><br/></div>

| Field        | Ordinal | Type   | Label | Description |
|--------------|---------|--------|-------|-------------|
| tag          | 1       | string |       |             |
| registry_url | 2       | string |       |             |
| dockerfile   | 3       | string |       |             |






<!-- Created by: Proto Diagram Tool -->
<!-- https://github.com/GoogleCloudPlatform/proto-gen-md-diagrams -->

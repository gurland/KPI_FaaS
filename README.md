This project is under HEAVY development

Do not look inside, ~boooOo~

1. Base image for runtimes
   - Context/Function injector
   - After injection into Function caller wait for result and collect logs
2. Design first Function caller and a proper runtime
3. Develop Load Balancer agent
   - Agent deployment involves installation of docker engine
   - Load Balancer communicates with Agent via gRPC
   - Return the function result to the rpc request from Load Balancer
   - Load Balancer launches runtimes by pulling images using Runtime.registry_url
   - Health checks
4. Design Load Balancer
   - Manage pool of configured VMs that are running LB Agent
   - Know what runtime images are cached on VM
   - Pass trigger context, function code to available warm runtime
   - If no warm runtimes - launch one
5. Create basic crontab service
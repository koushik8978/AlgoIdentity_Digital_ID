# Smart Contract Flow

## Contracts
- issue_contract.py: mint ASA and assign to recipient wallet
- verify_contract.py: check ASA ownership and optional policy (expiry, org)
- revoke_contract.py: freeze/clawback ASA on admin authority

## Lifecycle
1. Deploy contracts with your preferred tooling
2. Organization registers issuer address
3. User opts into ASA
4. Issue: app call + asset config to mint/transfer ASA to user
5. Verify: stateless logic evaluates ownership and policy
6. Revoke: admin freezes or clawbacks

## Testing
- Unit test PyTeal logic
- Integration: issue → verify → revoke on TestNet

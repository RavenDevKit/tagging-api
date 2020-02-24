Ravencoin Address Tagging
=========================

A small API which uses Ravencoin RPC to add/remove qualification tags to/from Ravencoin addresses.

## Get Started

You'll need to have access to a `ravend` RPC port.  That node's wallet will need some RVN to pay the fees on the tagging/untagging operations.

```bash
npm install
export RAVEN_RPC_USER="<rpc_user>"
export RAVEN_RPC_PASSWORD="<rpc_password>"
export RAVEN_RPC_PROTOCOL="http"  #default
export RAVEN_RPC_HOST="127.0.0.1" #default
export RAVEN_RPC_PORT="18766" #default
npm start
# OR, for more output
# DEBUG=tagger:* npm start
```

## Routes

In the following route specifications, `:tag` and `:subtag` refer to parts of a qualifier asset (tag) name.  Lowercase letters will be capitalized.  The leading "#" will be inferred if it's omitted (if you include it be sure to use URL encoding ("%23")).  Omit `:subtag` entirely if you're referring to a top-level tag.  `:address` should be a Ravencoin address.

### `/`
Displays info on the blockchain you're connected to.

### `/tags`
Lists the qualification assets (tags) you own as well as addresses which are tagged.

### `PUT /tag/:tag[/:subtag]/address/:address`
Attempts to add the specified tag to the specified address.  Will respond with 200 if the tag was added.  If the address already has the specified tag it will respond with 400.

#### Examples
* `PUT /tag/kyc/address/mxuW8izv8fYW4Hfg6Gs5G8o9t3ZCPQJMpd`
* `PUT /tag/kyc/vendor1/address/mxuW8izv8fYW4Hfg6Gs5G8o9t3ZCPQJMpd`
* `PUT /tag/%23PARENT_TAG/%23SUB_TAG/mxuW8izv8fYW4Hfg6Gs5G8o9t3ZCPQJMpd`

### `DELETE /tag/:tag[/:subtag]/address/:address`
Attempts to remove the specified tag from the specified address.  Will respond with 200 if the tag was removed.  If the address doesn't have the specified tag it will respond with 400.

#### Examples
* `DELETE /tag/kyc/address/mxuW8izv8fYW4Hfg6Gs5G8o9t3ZCPQJMpd`
* `DELETE /tag/kyc/vendor1/address/mxuW8izv8fYW4Hfg6Gs5G8o9t3ZCPQJMpd`
* `DELETE /tag/%23PARENT_TAG/%23SUB_TAG/mxuW8izv8fYW4Hfg6Gs5G8o9t3ZCPQJMpd`

# 👷 Manual Safe Events

Safe Events are preventing cheaters to trigger events to server from a cheating software.

### Exports Required

{% tabs %}
{% tab title="Client-Side" %}
```lua
--- @param event_name string
--- @param ... any
--- @return nil
exports["ac-resource-name"]:TriggerServerEvent(event_name, ...)
```
{% endtab %}

{% tab title="Server-Side" %}
```lua
--- @class SafeEventOptions
--- @field ban boolean
--- @field kick boolean

--- @param event_name string
--- @param options SafeEventOptions
--- @return nil
exports["ac-resource-name"]:RegisterSafeEvent(event_name, options)

--- @param event_name string
--- @param source number
--- @param ... any Event Arguments
--- @return boolean
exports["ac-resource-name"]:CheckEvent(event_name, source, ...)
```
{% endtab %}
{% endtabs %}

### Example

{% tabs %}
{% tab title="Client-Side" %}
```lua
local product = "phone"
local productprice = 500
        
exports["ac-resource-name"]:TriggerServerEvent("server:store:payitem", product, productprice)
```
{% endtab %}

{% tab title="Server-Side" %}
```lua
local safeEvents = {
    "server:store:payitem"
}

local anticheat_resource = ""
AddEventHandler("SW:SetupExports", function(anticheat, script)
    if script == "*" or script == GetCurrentResourceName() then
        anticheat_resource = anticheat
        for i=1,#safeEvents do
            exports[anticheat_resource]:RegisterSafeEvent(safeEvents[i], { ban = true, kick = false })
        end
    end
end)

RegisterNetEvent("server:store:payitem", function(item, price)
    local src = source
    if anticheat_resource ~= "" then
        if not exports[anticheat_resource]:CheckEvent("server:store:payitem", src, item, price) then return end
    end
    -- ...
end)
```
{% endtab %}
{% endtabs %}


const ValidateuniqueValueArray = function(value)
{
    return Array.isArray(value) && (value.length === 0 || new Set(value).size === value.length);
}

module.exports = {ValidateuniqueValueArray,}
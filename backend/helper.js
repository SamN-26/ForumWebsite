

const ValidateuniqueValueArray = function(value)
{
    return Array.isArray(value) && new Set(value).size == value.length;
}

module.exports = {ValidateuniqueValueArray}
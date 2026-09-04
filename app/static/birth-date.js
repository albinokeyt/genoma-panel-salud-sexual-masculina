(function (root) {
  function parse(parts, latest = new Date().toISOString().slice(0, 10)) {
    const day = String(parts.day || "").trim();
    const month = String(parts.month || "").trim();
    const year = String(parts.year || "").trim();
    if (!day && !month && !year) return { value: "", error: "" };
    if (!/^\d{1,2}$/.test(day) || !/^\d{1,2}$/.test(month) || !/^\d{4}$/.test(year)) {
      return { value: "", error: "Completa el día, el mes y el año de cuatro cifras." };
    }
    if (+year < 1900 || +year > +latest.slice(0, 4)) {
      return { value: "", error: "Revisa el año de nacimiento (desde 1900 hasta el año actual)." };
    }
    const date = new Date(Date.UTC(+year, +month - 1, +day));
    if (date.getUTCFullYear() !== +year || date.getUTCMonth() !== +month - 1 || date.getUTCDate() !== +day) {
      return { value: "", error: "La fecha de nacimiento no es válida." };
    }
    const value = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    if (value > latest) return { value: "", error: "La fecha de nacimiento no puede estar en el futuro." };
    return { value, error: "" };
  }

  function age(value, evaluation) {
    if (!value || !evaluation || value > evaluation) return "";
    const [year, month, day] = value.split("-").map(Number);
    const [endYear, endMonth, endDay] = evaluation.split("-").map(Number);
    return endYear - year - (endMonth < month || (endMonth === month && endDay < day) ? 1 : 0);
  }

  const helpers = { parse, age };
  if (typeof module !== "undefined" && module.exports) module.exports = helpers;
  else root.BirthDate = helpers;
})(typeof window === "undefined" ? this : window);

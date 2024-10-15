export const generateSessionId = () => {
	const existingId = localStorage.getItem("sessionId");
	if (existingId) return existingId;

	const newId = Date.now().toString(36) + Math.random().toString(36).substr(2);
	localStorage.setItem("sessionId", newId);
	console.log("sessionId" + newId);
	return newId;
};

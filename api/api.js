// LS STUDIO API Mock - для будущей интеграции с реальным API
const API_BASE = 'http://192.168.0.202/api';

const api = {
    // Мониторинг
    async getStatus() {
        return fetch(`${API_BASE}/status`);
    },
    
    // Анимации
    async getCues() {
        return fetch(`${API_BASE}/cues`);
    },
    async playCue(name) {
        return fetch(`${API_BASE}/cues/${name}/play`, { method: 'POST' });
    },
    async stopCue(name) {
        return fetch(`${API_BASE}/cues/${name}/stop`, { method: 'POST' });
    },
    async deleteCue(name) {
        return fetch(`${API_BASE}/cues/${name}`, { method: 'DELETE' });
    },
    
    // Плейлисты
    async getPlaylists() {
        return fetch(`${API_BASE}/playlists`);
    },
    async createPlaylist(name) {
        return fetch(`${API_BASE}/playlists`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
    },
    
    // Устройства Art-Net
    async getArtNetDevices() {
        return fetch(`${API_BASE}/artnet/devices`);
    },
    
    // Расписание
    async getSchedule() {
        return fetch(`${API_BASE}/scheduler`);
    },
    async addEvent(event) {
        return fetch(`${API_BASE}/scheduler/events`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event)
        });
    },
    
    // Триггеры
    async getTriggers() {
        return fetch(`${API_BASE}/triggers`);
    },
    
    // Настройки
    async getSettings(section) {
        return fetch(`${API_BASE}/settings/${section}`);
    },
    async updateSettings(section, data) {
        return fetch(`${API_BASE}/settings/${section}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    },
    
    // Логи
    async getLogs() {
        return fetch(`${API_BASE}/logs`);
    },
    
    // Система
    async reboot() {
        return fetch(`${API_BASE}/system/reboot`, { method: 'POST' });
    },
    async backup() {
        return fetch(`${API_BASE}/system/backup`, { method: 'POST' });
    },
    async restore(file) {
        return fetch(`${API_BASE}/system/restore`, {
            method: 'POST',
            body: file
        });
    }
};

export default api;

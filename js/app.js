// LS STUDIO EKB - Main Application
const { createApp, ref, computed, onMounted, nextTick, reactive } = Vue;

createApp({
    setup() {
        const page = ref('monitoring');
        const autoExp = ref(false);
        const devExp = ref(false);
        const searchQuery = ref('');
        const expOpen = reactive({});
        
        const weekDays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
        const otherMonthDays = [23, 24, 25, 26, 27, 28, 1];
        const currentMonthDays = [2, 3, 4, 5, 6, 7, 8];
        
        const cues = ref([
            { name: '005Celebrity.cue', duration: '60 sec', frames: 2400, universes: 5, used: 0, loaded: '25.02.2026' },
            { name: 'ScreenSpace.cue', duration: '60 sec', frames: 2400, universes: 5, used: 1, loaded: '25.02.2026' },
            { name: 'Start.cue', duration: '60 sec', frames: 2400, universes: 5, used: 1, loaded: '25.02.2026' },
            { name: 'Streamer.cue', duration: '31.48 sec', frames: 1259, universes: 5, used: 1, loaded: '25.02.2026' },
            { name: 'StreamerBLUE.cue', duration: '60 sec', frames: 2400, universes: 5, used: 0, loaded: '25.02.2026' },
            { name: 'StreamerBLUE001.cue', duration: '60 sec', frames: 2400, universes: 5, used: 0, loaded: '25.02.2026' },
        ]);
        
        const artNetDevices = ref([
            { uid: 'aba861', name: 'Light Stream Player V1', ip: '192.168.0.203', type: 'Lighting console', firmware: '1.2.1', status: 'Power On Tests successful', ports: 1, rdm: 0 },
            { uid: '864598', name: 'Light Stream Player V2', ip: '192.168.0.215', type: 'Lighting console', firmware: '1.2.1', status: 'Power On Tests successful', ports: 4, rdm: 0 },
            { uid: '8616bb', name: 'Light Stream Player V2', ip: '192.168.0.204', type: 'Lighting console', firmware: '1.2.1', status: 'Power On Tests successful', ports: 4, rdm: 0 },
            { uid: '1090f6', name: 'Converter 6 Rev3-1090F6', ip: '192.168.0.41', type: 'Dmx converter', firmware: 'CvOS v1.9.27', status: 'Power On Tests successful', ports: 6, rdm: 0 },
            { uid: '2cf628', name: 'STUDIO21 C2', ip: '192.168.0.59', type: 'Dmx converter', firmware: 'CvOS v1.9.27', status: 'Power On Tests successful', ports: 2, rdm: 0 },
            { uid: 'd2419e', name: 'STUDIO21 C6', ip: '192.168.0.99', type: 'Dmx converter', firmware: 'CvOS v1.9.27', status: 'Power On Tests successful', ports: 6, rdm: 0 },
            { uid: '26c7d0', name: 'Converter 6-26C7D0', ip: '192.168.0.137', type: 'Dmx converter', firmware: 'CvOS v1.9.27', status: 'Power On Tests successful', ports: 6, rdm: 0 },
            { uid: '47c5f1', name: 'Converter 2 Rev3-47C5F1', ip: '192.168.0.46', type: 'Dmx converter', firmware: 'CvOS v1.9.27', status: 'Power On Tests successful', ports: 2, rdm: 0 },
            { uid: '77fe02', name: 'Converter 8L-77FE02', ip: '192.168.0.57', type: 'Dmx converter', firmware: 'CvOS v1.9.27', status: 'Power On Tests successful', ports: 8, rdm: 0 },
            { uid: 'fd9a2e', name: 'Light Stream Player V2', ip: '192.168.0.205', type: 'Lighting console', firmware: '1.2.0', status: 'Power On Tests successful', ports: 4, rdm: 0 },
        ]);
        
        const universes = ref([
            { number: 1, address: '0.0.1' }, { number: 2, address: '0.0.2' }, { number: 3, address: '0.0.3' },
            { number: 4, address: '0.0.4' }, { number: 5, address: '0.0.5' }, { number: 6, address: '0.0.6' },
            { number: 7, address: '0.0.7' }, { number: 8, address: '0.0.8' },
        ]);
        
        const converters = ref([
            { name: 'Converter 2 STUDIO21', mode: 'unicast', ip: '192.168.0.59', port: 6454, description: 'Converter 2 STUDIO21' },
            { name: 'Converter 6 Rev3 Studio21', mode: 'unicast', ip: '192.168.0.99', port: 6454, description: 'Converter 6 Rev3 Studio21' },
        ]);
        
        const logs = ref([
            { time: '2026-03-03 08:15:04,535', msg: 'I Play playlist Playlist. Priority scheduler. Count: None' },
            { time: '2026-03-03 08:15:04,444', msg: 'I Player unlocked' },
            { time: '2026-03-03 08:15:02,755', msg: 'I Player locked' },
            { time: '2026-03-02 19:00:00,078', msg: 'I Play playlist Playlist. Priority scheduler. Count: None' },
            { time: '2026-03-01 19:00:00,082', msg: 'I Play playlist Playlist. Priority scheduler. Count: None' },
        ]);
        
        const filteredCues = computed(() => {
            if (!searchQuery.value) return cues.value;
            return cues.value.filter(c => c.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
        });
        
        const currentTime = computed(() => new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }));
        const currentDate = computed(() => new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }));
        
        const playCue = (name) => console.log('Play:', name);
        const stopCue = (name) => console.log('Stop:', name);
        const deleteCue = (name) => console.log('Delete:', name);
        
        const drawPreview = (id, color) => {
            const canvas = document.getElementById(id);
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, 160, 120);
            for (let r = 0; r < 12; r++) {
                for (let c = 0; c < 16; c++) {
                    ctx.fillStyle = Math.random() > 0.7 ? color : '#333';
                    ctx.beginPath();
                    ctx.arc(c * 8 + 16, r * 8 + 10, 2, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(20, 30);
            ctx.lineTo(60, 50);
            ctx.stroke();
        };
        
        onMounted(() => {
            nextTick(() => {
                const colors = ['#4169e1', '#ff6347', '#32cd32', '#ffd700', '#ff69b4', '#00ced1'];
                cues.value.forEach((c, i) => drawPreview('canvas-' + c.name, colors[i % colors.length]));
                ['Streamer.cue','Start.cue','ScreenSpace.cue'].forEach((c, i) => drawPreview('mini-' + c, colors[i % colors.length]));
            });
        });
        
        return { 
            page, autoExp, devExp, searchQuery, expOpen, 
            weekDays, otherMonthDays, currentMonthDays, 
            cues, filteredCues, artNetDevices, universes, converters, logs, 
            currentTime, currentDate, 
            playCue, stopCue, deleteCue 
        };
    }
}).mount('#app');

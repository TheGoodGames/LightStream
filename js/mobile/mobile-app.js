// Mobile App - LS STUDIO EKB
const { createApp, ref, computed, onMounted, reactive, watch } = Vue;

createApp({
    setup() {
        const currentPage = ref('monitoring');
        const searchOpen = ref(false);
        const searchQuery = ref('');
        const currentLang = ref('RU');
        
        const weekDays = ref(['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']);
        const otherMonthDays = ref([23, 24, 25, 26, 27, 28, 1]);
        const currentMonthDays = ref([2, 3, 4, 5, 6, 7, 8]);
        
        // Данные мониторинга
        const monitoringCards = ref([
            { id: 'uptime', title: 'Время работы', value: '5 д. 22 ч.', subtitle: '', icon: '🕐', highlight: false },
            { id: 'artnet', title: 'Art-Net устройства', value: '9 / 9', subtitle: '', icon: '🖥', highlight: false },
            { id: 'rdm', title: 'RDM устройства', value: '0', subtitle: '', icon: '📶', highlight: false },
            { id: 'license', title: 'Лицензия', value: '31.12.2026', subtitle: '', icon: '🔑', highlight: true },
            { id: 'network', title: 'Локальная сеть', value: 'Включено', subtitle: '', icon: '🌐', highlight: false },
            { id: 'storage', title: 'Хранилище', value: '6.5 / 28.3', subtitle: 'Гб', icon: '💾', highlight: false },
        ]);
        
        // Входы/Выходы
        const ioPorts = ref([
            { id: 'di1', label: 'DI-1', icon: '▼', enabled: false },
            { id: 'di2', label: 'DI-2', icon: '▼', enabled: false },
            { id: 'di3', label: 'DI-3', icon: '▼', enabled: false },
            { id: 'do1', label: 'DO-1', icon: '▲', enabled: false },
            { id: 'do2', label: 'DO-2', icon: '▲', enabled: false },
            { id: 'do3', label: 'DO-3', icon: '▲', enabled: false },
        ]);
        
        // Сетевые интерфейсы
        const networkInterfaces = ref([
            { 
                name: 'Ethernet 1', 
                status: 'up', 
                ip: '192.168.0.202',
                mask: '255.255.255.0',
                gateway: '192.168.0.1',
                dns: 'Вручную',
                mac: 'd8:3a:dd:86:46:f3',
                icon: '🔌',
                expanded: false
            },
            { 
                name: 'Ethernet 2', 
                status: 'up', 
                ip: '192.168.0.104',
                mask: '255.255.255.0',
                gateway: '192.168.0.1',
                dns: '8.8.8.8',
                mac: '00:1e:c0:00:00:21',
                icon: '🌐',
                expanded: false
            },
        ]);
        
        // Производительность
        const performanceCards = ref([
            { id: 'cpu', label: 'Загрузка процессора', value: '7.4%', icon: '📊', barWidth: 7 },
            { id: 'temp', label: 'Температура CPU', value: '39.9°C', icon: '🌡', barWidth: 40 },
            { id: 'ram', label: 'Загрузка памяти', value: '17%', icon: '💾', barWidth: 17 },
            { id: 'storage', label: 'Хранилище', value: '28.3 Гб', subtitle: '21.8 Гб свободно', icon: '💿', barWidth: 75 },
        ]);
        
        // Анимации (Cues)
        const cues = ref([
            { id: 1, name: '005Celebrity.cue', duration: '60 sec', frames: 2400, universes: 5, used: 0, loaded: '25.02.2026', color: '#4169e1' },
            { id: 2, name: 'ScreenSpace.cue', duration: '60 sec', frames: 2400, universes: 5, used: 1, loaded: '25.02.2026', color: '#ff6347' },
            { id: 3, name: 'Start.cue', duration: '60 sec', frames: 2400, universes: 5, used: 1, loaded: '25.02.2026', color: '#32cd32' },
            { id: 4, name: 'Streamer.cue', duration: '31.48 sec', frames: 1259, universes: 5, used: 1, loaded: '25.02.2026', color: '#ffd700' },
            { id: 5, name: 'StreamerBLUE.cue', duration: '60 sec', frames: 2400, universes: 5, used: 0, loaded: '25.02.2026', color: '#00ced1' },
            { id: 6, name: 'StreamerBLUE001.cue', duration: '60 sec', frames: 2400, universes: 5, used: 0, loaded: '25.02.2026', color: '#ff69b4' },
            { id: 7, name: '005Celebrity.cue', duration: '60 sec', frames: 2400, universes: 5, used: 0, loaded: '25.02.2026', color: '#9370db' },
            { id: 8, name: 'ScreenSpace.cue', duration: '60 sec', frames: 2400, universes: 5, used: 1, loaded: '25.02.2026', color: '#20b2aa' },
        ]);
        
        // Устройства
        const allDevices = ref([
            { uid: 'aba861', name: 'Light Stream Player V1', ip: '192.168.0.203', type: 'Lighting console', firmware: '1.2.1', status: 'online', ports: 1 },
            { uid: '864598', name: 'Light Stream Player V2', ip: '192.168.0.215', type: 'Lighting console', firmware: '1.2.1', status: 'online', ports: 4 },
            { uid: '8616bb', name: 'Light Stream Player V2', ip: '192.168.0.204', type: 'Lighting console', firmware: '1.2.1', status: 'online', ports: 4 },
            { uid: '1090f6', name: 'Converter 6 Rev3', ip: '192.168.0.41', type: 'Dmx converter', firmware: 'CvOS v1.9.27', status: 'online', ports: 6 },
            { uid: '2cf628', name: 'STUDIO21 C2', ip: '192.168.0.59', type: 'Dmx converter', firmware: 'CvOS v1.9.27', status: 'offline', ports: 2 },
            { uid: 'd2419e', name: 'STUDIO21 C6', ip: '192.168.0.99', type: 'Dmx converter', firmware: 'CvOS v1.9.27', status: 'online', ports: 6 },
            { uid: '26c7d0', name: 'Converter 6-26C7D0', ip: '192.168.0.137', type: 'Dmx converter', firmware: 'CvOS v1.9.27', status: 'offline', ports: 6 },
            { uid: '47c5f1', name: 'Converter 2 Rev3', ip: '192.168.0.46', type: 'Dmx converter', firmware: 'CvOS v1.9.27', status: 'online', ports: 2 },
            { uid: '77fe02', name: 'Converter 8L-77FE02', ip: '192.168.0.57', type: 'Dmx converter', firmware: 'CvOS v1.9.27', status: 'online', ports: 8 },
            { uid: 'fd9a2e', name: 'Light Stream Player V2', ip: '192.168.0.205', type: 'Lighting console', firmware: '1.2.0', status: 'online', ports: 4 },
        ]);
        
        const dmxConverters = computed(() => allDevices.value.filter(d => d.type === 'Dmx converter'));
        const lightingConsoles = computed(() => allDevices.value.filter(d => d.type === 'Lighting console'));
        const rdmDevices = computed(() => allDevices.value.filter(d => d.type === 'RDM device'));
        
        const expandedCueId = ref(null);
        
        const toggleCueExpand = (id) => {
            if (expandedCueId.value === id) {
                expandedCueId.value = null;
            } else {
                expandedCueId.value = id;
            }
        };
        
        const playCue = (id, event) => {
            event.stopPropagation();
            console.log('Play cue:', id);
        };
        
        const stopCue = (id, event) => {
            event.stopPropagation();
            console.log('Stop cue:', id);
        };
        
        const deleteCue = (id, event) => {
            event.stopPropagation();
            const index = cues.value.findIndex(c => c.id === id);
            if (index > -1) cues.value.splice(index, 1);
            if (expandedCueId.value === id) expandedCueId.value = null;
        };
        
        // Навигация
        const navItems = ref([
            { id: 'monitoring', label: 'Главная', icon: '🏠' },
            { id: 'devices', label: 'Устройства', icon: '🖥' },
            { id: 'scheduler', label: 'Расписание', icon: '📅' },
            { id: 'cues', label: 'Анимации', icon: '🎬' },
            { id: 'settings', label: 'Настройки', icon: '⚙️' },
        ]);
        
        const toggleSearch = () => {
            searchOpen.value = !searchOpen.value;
            if (!searchOpen.value) searchQuery.value = '';
        };
        
        const toggleLang = () => {
            currentLang.value = currentLang.value === 'RU' ? 'EN' : 'RU';
        };
        
        const toggleIO = (id) => {
            const port = ioPorts.value.find(p => p.id === id);
            if (port) port.enabled = !port.enabled;
        };
        
        const toggleNetworkExpand = (index) => {
            networkInterfaces.value[index].expanded = !networkInterfaces.value[index].expanded;
        };
        
        const navigateTo = (page) => {
            currentPage.value = page;
        };
        
        // Показать подсказку о скролле при первом заходе
        const showScrollHint = () => {
            const hasScrolled = localStorage.getItem('ls_scrolled');
            if (!hasScrolled) {
                const hint = document.querySelector('.cards-scroll-hint');
                if (hint) {
                    hint.style.opacity = '1';
                    setTimeout(() => {
                        hint.style.opacity = '0';
                        localStorage.setItem('ls_scrolled', 'true');
                    }, 3000);
                }
            }
        };
        
        const drawPreview = (id, color) => {
            const canvas = document.getElementById(id);
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw LED grid
            const ledSize = 3;
            const spacing = canvas.width / 16;
            for (let row = 0; row < 12; row++) {
                for (let col = 0; col < 16; col++) {
                    const x = col * spacing + spacing / 2;
                    const y = row * (canvas.height / 12) + (canvas.height / 12) / 2;
                    ctx.fillStyle = Math.random() > 0.7 ? color : '#333';
                    ctx.beginPath();
                    ctx.arc(x, y, ledSize, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            
            // Draw "beam"
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(canvas.width * 0.15, canvas.height * 0.25);
            ctx.lineTo(canvas.width * 0.4, canvas.height * 0.45);
            ctx.stroke();
        };
        
        const redrawAllPreviews = () => {
            setTimeout(() => {
                cues.value.forEach((cue) => {
                    drawPreview('canvas-' + cue.id, cue.color);
                });
                // Also redraw expanded if exists
                if (expandedCueId.value) {
                    const cue = cues.value.find(c => c.id === expandedCueId.value);
                    if (cue) {
                        drawPreview('canvas-expanded-' + cue.id, cue.color);
                    }
                }
            }, 50);
        };
        
        onMounted(() => {
            console.log('Mobile app mounted');
            showScrollHint();
            
            // Draw cue previews after DOM is ready
            redrawAllPreviews();
        });
        
        // Watch for expanded cue and draw its preview
        watch(expandedCueId, (newId, oldId) => {
            // When collapsing, redraw the compact preview
            if (oldId) {
                const oldCue = cues.value.find(c => c.id === oldId);
                if (oldCue) {
                    setTimeout(() => {
                        drawPreview('canvas-' + oldCue.id, oldCue.color);
                    }, 100);
                }
            }
            // When expanding, draw the expanded preview
            if (newId) {
                const cue = cues.value.find(c => c.id === newId);
                if (cue) {
                    setTimeout(() => {
                        drawPreview('canvas-expanded-' + cue.id, cue.color);
                    }, 50);
                }
            }
        });
        
        return {
            currentPage,
            searchOpen,
            searchQuery,
            currentLang,
            weekDays,
            otherMonthDays,
            currentMonthDays,
            monitoringCards,
            ioPorts,
            networkInterfaces,
            performanceCards,
            cues,
            expandedCueId,
            allDevices,
            dmxConverters,
            lightingConsoles,
            rdmDevices,
            navItems,
            toggleSearch,
            toggleLang,
            toggleIO,
            toggleNetworkExpand,
            toggleCueExpand,
            playCue,
            stopCue,
            deleteCue,
            navigateTo
        };
    }
}).mount('#app');

const Home = {
    template: `
        <div>
            <div class="text-center my-8">
                <h1 class="text-4xl font-extrabold text-blue-700 mb-2">Sistem Pengaduan Layanan Masyarakat</h1>
                <p class="text-gray-600 text-lg">Laporkan masalah infrastruktur, kebersihan, dan fasilitas umum di sekitarmu dengan cepat.</p>
            </div>

            <div class="mt-12">
                <h2 class="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">📋 Laporan Terkini</h2>
                
                <div v-if="loading" class="text-center py-8 text-gray-500 font-semibold animate-pulse">
                    Sedang memuat laporan masyarakat...
                </div>

                <div v-else-if="reports.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="report in reports" :key="report.id_pengaduan" class="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden flex flex-col justify-between">
                        <div>
                            <img :src="'http://localhost:8080/uploads/' + report.foto_bukti" alt="Bukti laporan" class="w-full h-48 object-cover">
                            
                            <div class="p-5">
                                <div class="flex justify-between items-center mb-3">
                                    <span class="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded">{{ report.nama_kategori }}</span>
                                    
                                    <span :class="{
                                        'bg-yellow-100 text-yellow-800': report.status === 'Pending',
                                        'bg-orange-100 text-orange-800': report.status === 'Diproses',
                                        'bg-green-100 text-green-800': report.status === 'Selesai'
                                    }" class="text-xs font-bold px-2.5 py-1 rounded">
                                        {{ report.status }}
                                    </span>
                                </div>
                                <h3 class="text-xl font-bold text-gray-800 mb-2">{{ report.judul_laporan }}</h3>
                                <p class="text-gray-600 text-sm line-clamp-3">{{ report.isi_laporan }}</p>
                            </div>
                        </div>

                        <div class="bg-gray-50 px-5 py-3 border-t border-gray-100 text-xs text-gray-500 flex justify-between">
                            <span>Pelapor: <strong class="text-gray-700">{{ report.username }}</strong></span>
                            <span>{{ new Date(report.created_at).toLocaleDateString('id-ID') }}</span>
                        </div>
                    </div>
                </div>

                <div v-else class="text-center py-12 text-gray-500">
                    Belum ada laporan pengaduan masyarakat saat ini.
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            reports: [],
            loading: true
        }
    },
    mounted() {
        this.fetchReports();
    },
    methods: {
        fetchReports() {
            axios.get(`${API_URL}/pengaduan`)
                .then(response => {
                    this.reports = response.data.data;
                    this.loading = false;
                })
                .catch(error => {
                    console.error("Gagal memuat laporan:", error);
                    this.loading = false;
                });
        }
    }
};
const Dashboard = {
    template: `
        <div>
            <div class="flex justify-between items-center mb-8">
                <div>
                    <h1 class="text-3xl font-bold text-gray-800">Panel Kendali Admin</h1>
                    <p class="text-sm text-gray-500">Kelola rincian data laporan pengaduan masyarakat secara real-time.</p>
                </div>
                <div class="bg-blue-50 border border-blue-200 text-blue-700 text-sm px-4 py-2 rounded-md font-medium">
                    Role: Administrator 🛡️
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white p-5 rounded-lg shadow border-l-4 border-yellow-500 flex justify-between items-center">
                    <div><p class="text-gray-500 text-sm font-semibold uppercase tracking-wider">Status Pending</p><p class="text-2xl font-bold text-gray-800">{{ countStatus('Pending') }}</p></div>
                    <div class="text-2xl">⏳</div>
                </div>
                <div class="bg-white p-5 rounded-lg shadow border-l-4 border-orange-500 flex justify-between items-center">
                    <div><p class="text-gray-500 text-sm font-semibold uppercase tracking-wider">Sedang Diproses</p><p class="text-2xl font-bold text-gray-800">{{ countStatus('Diproses') }}</p></div>
                    <div class="text-2xl">⚙️</div>
                </div>
                <div class="bg-white p-5 rounded-lg shadow border-l-4 border-green-500 flex justify-between items-center">
                    <div><p class="text-gray-500 text-sm font-semibold uppercase tracking-wider">Laporan Selesai</p><p class="text-2xl font-bold text-gray-800">{{ countStatus('Selesai') }}</p></div>
                    <div class="text-2xl">✅</div>
                </div>
            </div>

            <div class="bg-white rounded-lg shadow overflow-hidden">
                <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h2 class="text-lg font-bold text-gray-700">Daftar Pengaduan Masuk</h2>
                    <button @click="fetchData" class="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded transition">🔄 Segarkan Data</button>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                                <th class="px-6 py-3 font-semibold">ID</th>
                                <th class="px-6 py-3 font-semibold">Pelapor & Tanggal</th>
                                <th class="px-6 py-3 font-semibold">Kategori & Judul</th>
                                <th class="px-6 py-3 font-semibold">Foto Bukti</th>
                                <th class="px-6 py-3 font-semibold">Status</th>
                                <th class="px-6 py-3 font-semibold text-center">Aksi Operasi</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 text-sm">
                            <tr v-for="(item, idx) in complaints" :key="item.id_pengaduan" class="hover:bg-gray-50 transition">
                                <td class="px-6 py-4 font-medium text-gray-900">{{ idx + 1 }}</td>
                                <td class="px-6 py-4">
                                    <div class="font-semibold text-gray-800">{{ item.username }}</div>
                                    <div class="text-xs text-gray-400">{{ new Date(item.created_at).toLocaleDateString('id-ID') }}</div>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-0.5 rounded mb-1 inline-block">{{ item.nama_kategori }}</span>
                                    <div class="font-medium text-gray-700">{{ item.judul_laporan }}</div>
                                </td>
                                <td class="px-6 py-4">
                                    <img :src="'http://localhost:8080/uploads/' + item.foto_bukti" class="w-16 h-12 object-cover rounded border border-gray-200 shadow-sm">
                                </td>
                                <td class="px-6 py-4">
                                    <select @change="updateStatus(item.id_pengaduan, $event.target.value)"
                                        :class="{
                                            'bg-yellow-50 text-yellow-700 border-yellow-300 focus:ring-yellow-400': item.status === 'Pending',
                                            'bg-orange-50 text-orange-700 border-orange-300 focus:ring-orange-400': item.status === 'Diproses',
                                            'bg-green-50 text-green-700 border-green-300 focus:ring-green-400': item.status === 'Selesai'
                                        }"
                                        class="text-xs font-bold rounded border px-2 py-1 focus:outline-none focus:ring-2 cursor-pointer transition">
                                        <option value="Pending" :selected="item.status === 'Pending'">⏳ Pending</option>
                                        <option value="Diproses" :selected="item.status === 'Diproses'">⚙️ Diproses</option>
                                        <option value="Selesai" :selected="item.status === 'Selesai'">✅ Selesai</option>
                                    </select>
                                </td>
                                <td class="px-6 py-4 text-center">
                                    <button @click="deleteComplaint(item.id_pengaduan)" class="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-semibold px-3 py-1.5 rounded transition">
                                        🗑️ Hapus Laporan
                                    </button>
                                </td>
                            </tr>
                            <tr v-if="complaints.length === 0">
                                <td colspan="6" class="text-center py-8 text-gray-400">Tidak ada pengaduan masyarakat yang tersedia.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            complaints: []
        }
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            axios.get(`${API_URL}/pengaduan`)
                .then(response => {
                    this.complaints = response.data.data;
                })
                .catch(error => {
                    console.error("Gagal menarik data master pengaduan:", error);
                });
        },
        updateStatus(id, newStatus) {
            // Mengirim data baru menggunakan metode PUT (X-WWW-FORM-URLENCODED) lewat Axios
            const params = new URLSearchParams();
            params.append('status', newStatus);

            axios.put(`${API_URL}/pengaduan/${id}`, params)
                .then(response => {
                    alert('Status laporan sukses diperbarui!');
                    this.fetchData(); // Refresh tampilan data tabel
                })
                .catch(error => {
                    alert('Gagal memperbarui status. Sesi mungkin kedaluwarsa.');
                    console.error(error);
                });
        },
        deleteComplaint(id) {
            if (confirm('Apakah Anda yakin ingin menghapus permanen laporan aduan ini beserta file gambarnya dari server?')) {
                axios.delete(`${API_URL}/pengaduan/${id}`)
                    .then(response => {
                        alert('Laporan pengaduan berhasil dihapus dari database.');
                        this.fetchData(); // Refresh data tabel
                    })
                    .catch(error => {
                        alert('Operasi hapus gagal.');
                        console.error(error);
                    });
            }
        },
        countStatus(statusName) {
            return this.complaints.filter(item => item.status === statusName).length;
        }
    }
};
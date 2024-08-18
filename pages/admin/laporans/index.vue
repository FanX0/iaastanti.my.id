<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-12">
            <div class="card border-0 rounded shadow-sm border-top-orange">
              <div class="card-header">
                <span class="font-weight-bold"><i class="fa fa-file-alt"></i> LAPORAN TRANSAKSI</span>
              </div>
              <div class="card-body">
                <div class="form-group">
                  <div class="input-group mb-3">
                    <input type="date" class="form-control" v-model="startDate" placeholder="Start Date">
                    <input type="date" class="form-control" v-model="endDate" placeholder="End Date">
                    <div class="input-group-append">
                      <button class="btn btn-warning" @click="getLaporanTransaksi">
                        <i class="fa fa-search"></i> CARI
                      </button>
                    </div>
                  </div>
                </div>
                <div v-if="startDate && endDate">
                  <b-table striped bordered hover :items="formattedInvoices" :fields="fields" show-empty>
                    <template v-slot:cell(grand_total)="row">
                      {{ formatPrice(row.item.grand_total) }}
                    </template>
                    <template v-slot:cell(status)="row">
                      <button v-if="row.item.status == 'pending'" class="btn btn-sm btn-primary"><i class="fa fa-circle-notch fa-spin"></i> {{ row.item.status }}</button>
                      <button v-if="row.item.status == 'success'" class="btn btn-sm btn-success"><i class="fa fa-check-circle"></i> {{ row.item.status }}</button>
                      <button v-if="row.item.status == 'expired'" class="btn btn-sm btn-warning-2"><i class="fa fa-exclamation-triangle"></i> {{ row.item.status }}</button>
                      <button v-if="row.item.status == 'failed'" class="btn btn-sm btn-danger"><i class="fa fa-times-circle"></i> {{ row.item.status }}</button>
                    </template>
                    <template v-slot:cell(actions)="row">
                      <b-button :to="{name: 'admin-invoices-show-id', params: {id: row.item.id}}" variant="info" size="sm">
                        DETAIL
                      </b-button>
                    </template>
                  </b-table>
                  <div class="mt-3">
                    <button class="btn btn-success" @click="exportToExcel">Export to Excel</button>
                    <button class="btn btn-danger" @click="exportToPdf">Export to PDF</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<script>
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export default {
  layout: 'admin',

  head() {
    return {
      title: 'Laporan Transaksi - Administrator',
    }
  },

  data() {
    return {
      fields: [
        { label: 'No. Invoice', key: 'invoice' },
        { label: 'Pelanggan', key: 'customer.name' },
        { label: 'Phone', key: 'phone' },
        { label: 'Grand Total', key: 'grand_total' },
        { label: 'Status Payment', key: 'status', tdClass: 'text-center' },
        { label: 'Tanggal Order', key: 'created_at' },
      ],
      startDate: '',
      endDate: ''
    }
  },

  computed: {
    invoices() {
      return this.$store.state.admin.laporan.laporans;
    },

    formattedInvoices() {
      return this.invoices.map(invoice => {
        return {
          ...invoice,
          created_at: new Date(invoice.created_at).toLocaleDateString('id-ID')
        };
      });
    }
  },

  methods: {
    getLaporanTransaksi() {
      if (!this.startDate || !this.endDate) {
        alert('Please select both start and end dates');
        return;
      }

      this.$store.dispatch('admin/laporan/getLaporansData', {
        start_date: this.startDate,
        end_date: this.endDate
      });
    },

    formatPrice(value) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(value);
    },

    exportToExcel() {
      const headers = this.fields.map(field => field.label);
      const data = this.formattedInvoices.map(invoice => [
        invoice.invoice,
        invoice.customer.name,
        invoice.phone,
        this.formatPrice(invoice.grand_total),
        invoice.status,
        invoice.created_at
      ]);

      const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Laporan Transaksi');

      XLSX.writeFile(wb, 'Laporan_Transaksi.xlsx');
    },

    exportToPdf() {
      const doc = new jsPDF();
      const headers = this.fields.map(field => field.label);
      const data = this.formattedInvoices.map(invoice => [
        invoice.invoice,
        invoice.customer.name,
        invoice.phone,
        this.formatPrice(invoice.grand_total),
        invoice.status,
        invoice.created_at
      ]);

      doc.autoTable({
        head: [headers],
        body: data
      });

      doc.save('Laporan_Transaksi.pdf');
    }
  }
}
</script>

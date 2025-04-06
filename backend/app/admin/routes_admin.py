from flask import Blueprint, jsonify
from app.admin.dashboard_service import get_dashboard_metrics

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/dashboard', methods=['GET'])
def dashboard():
    """
    Retorna dados consolidados para o painel administrativo.
    """
    try:
        data = get_dashboard_metrics()
        return jsonify({"success": True, "data": data}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
